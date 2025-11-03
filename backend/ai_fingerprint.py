import numpy as np

def detect_anomaly(consumption_data):
    """
    Simulates an AI-powered anomaly detection.
    Flags any consumption over 100L as an anomaly.
    """
    anomalies = []
    for data_point in consumption_data:
        # The data from the database will be a tuple (timestamp, consumption)
        timestamp, consumption = data_point
        if consumption > 100:
            anomalies.append({
                "time": timestamp.isoformat(),
                "value": consumption,
                "message": "Unusually high water consumption detected."
            })
    return anomalies