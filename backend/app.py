from flask import Flask, jsonify
from flask_cors import CORS
import os
import psycopg2
from datetime import datetime, timedelta
from ai_fingerprint import detect_anomaly

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# --- Database Connection Details ---
# CORRECTED: POSTGRES_DB instead of POSTGRE_DB
DB_NAME = os.getenv("POSTGRES_DB")
DB_USER = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_HOST = "db" # Service name from docker-compose
DB_PORT = "5432"

def get_db_connection():
    """Establishes a connection to the PostgreSQL database."""
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    return conn

@app.route('/api/water_consumption')
def get_water_consumption():
    """
    Fetches water consumption data for the last 24 hours from the database.
    """
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Query for data in the last 24 hours
    twenty_four_hours_ago = datetime.now() - timedelta(days=1)
    cur.execute(
        "SELECT timestamp, consumption_liters FROM water_consumption WHERE timestamp >= %s ORDER BY timestamp ASC",
        (twenty_four_hours_ago,)
    )
    
    db_data = cur.fetchall()
    cur.close()
    conn.close()

    # Format data for the frontend
    consumption_data = [
        {
            "time": row[0].isoformat(),
            "Your Consumption": row[1]
        }
        for row in db_data
    ]

    # Run anomaly detection on the fetched data
    anomalies = detect_anomaly(db_data)

    return jsonify({
        "consumption": consumption_data,
        "anomalies": anomalies
    })

if __name__ == '__main__':
    # The port is mapped in docker-compose, so we run on 5000 inside the container
    app.run(host='0.0.0.0', port=5000, debug=True)