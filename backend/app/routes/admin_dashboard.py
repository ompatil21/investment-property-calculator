from flask import Blueprint, request, jsonify
from app.db import db
from datetime import datetime

admin_bp = Blueprint("admin_dashboard", __name__, url_prefix="/api/admin/dashboard")


@admin_bp.route("/metrics", methods=["GET"])
def get_admin_dashboard_metrics():
    try:
        property_type = request.args.get("type")  # e.g., "Apartment"
        start_date = request.args.get("start_date")  # e.g., "2024-01-01"
        end_date = request.args.get("end_date")  # e.g., "2025-01-01"

        query = {}
        if property_type:
            query["type"] = property_type

        if start_date or end_date:
            query["created_at"] = {}
            if start_date:
                query["created_at"]["$gte"] = datetime.strptime(start_date, "%Y-%m-%d")
            if end_date:
                query["created_at"]["$lte"] = datetime.strptime(end_date, "%Y-%m-%d")

        total_properties = db.properties.count_documents(query)

        avg_result = list(
            db.properties.aggregate(
                [
                    {"$match": query},
                    {"$group": {"_id": None, "avg_price": {"$avg": "$purchase_price"}}},
                ]
            )
        )
        avg_purchase_price = round(avg_result[0]["avg_price"], 2) if avg_result else 0

        recent_properties = list(
            db.properties.find(
                query, {"title": 1, "location": 1, "type": 1, "created_at": 1}
            )
            .sort("created_at", -1)
            .limit(5)
        )

        for prop in recent_properties:
            prop["_id"] = str(prop["_id"])
            prop["created_at"] = prop["created_at"].strftime("%Y-%m-%d")

        return jsonify(
            {
                "total_properties": total_properties,
                "average_purchase_price": avg_purchase_price,
                "recent_properties": recent_properties,
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@admin_bp.route("/distribution/type", methods=["GET"])
def get_property_type_distribution():
    try:
        pipeline = [
            {"$group": {"_id": "$type", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
        ]

        results = list(db.properties.aggregate(pipeline))

        distribution = [
            {"type": item["_id"], "count": item["count"]} for item in results
        ]

        return jsonify({"distribution_by_type": distribution})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
