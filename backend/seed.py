import os
import psycopg2
import numpy as np
from datetime import datetime, timedelta

# --- Database Connection Details ---
# CORRECTED: POSTGRES_DB instead of POSTGRE_DB
DB_NAME = os.getenv("POSTGRES_DB")
DB_USER = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_HOST = "db" # This is the service name in docker-compose.yml
DB_PORT = "5432"

def get_db_connection():
    """Establishes a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        print("Database connection successful.")
        return conn
    except psycopg2.OperationalError as e:
        print(f"Could not connect to the database: {e}")
        return None

def seed_data():
    """Creates table and inserts historical water consumption data."""
    conn = get_db_connection()
    if conn is None:
        return

    try:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS water_consumption (
                    id SERIAL PRIMARY KEY,
                    timestamp TIMESTAMPTZ NOT NULL,
                    consumption_liters FLOAT NOT NULL
                );
            """)
            print("Table 'water_consumption' checked/created successfully.")

            cur.execute("SELECT COUNT(*) FROM water_consumption;")
            if cur.fetchone()[0] > 0:
                print("Data already exists. Skipping seeding.")
                return

            print("Generating and inserting historical data... This may take a moment.")
            end_time = datetime.now()
            start_time = end_time - timedelta(days=365)
            
            current_time = start_time
            batch_data = []
            while current_time <= end_time:
                hour = current_time.hour
                base_consumption = 2 + np.random.uniform(0, 2)
                
                if 6 <= hour < 9:
                    base_consumption = np.random.uniform(15, 40)
                elif 18 <= hour < 21:
                    base_consumption = np.random.uniform(10, 30)
                
                noise = np.random.normal(0, 1.5)
                consumption = max(0, base_consumption + noise)

                if np.random.rand() < 0.0005:
                    consumption += np.random.uniform(100, 200)

                batch_data.append((current_time, round(consumption, 2)))
                current_time += timedelta(minutes=30)
            
            if len(batch_data) >= 2:
                print("Applying custom spike to the last two data points.")
                batch_data[-2] = (batch_data[-2][0], 30.00)
                batch_data[-1] = (batch_data[-1][0], 150.00)

            insert_query = "INSERT INTO water_consumption (timestamp, consumption_liters) VALUES (%s, %s)"
            cur.executemany(insert_query, batch_data)
            
            conn.commit()
            print(f"Successfully inserted {len(batch_data)} records.")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    seed_data()