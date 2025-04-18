from flask import Blueprint, request, jsonify
from app.db import db
from app.models.property import property_serializer
from bson.objectid import ObjectId
from datetime import datetime

bp = Blueprint("properties", __name__, url_prefix="/api/properties")


@bp.route("", methods=["GET"])
def get_properties():
    properties = db.properties.find()
    return jsonify([property_serializer(p) for p in properties])


@bp.route("/<id>", methods=["GET"])
def get_property(id):
    property_doc = db.properties.find_one({"_id": ObjectId(id)})
    if property_doc:
        return jsonify(property_serializer(property_doc))
    return jsonify({"error": "Property not found"}), 404


@bp.route("", methods=["POST"])
def create_property():
    try:
        data = request.get_json()
        print("🔥 Full request JSON:", data)

        parsed = {
            "title": data.get("title"),
            "location": data.get("location"),
            "type": data.get("type"),
            "purchase_price": float(data.get("purchase_price", 0)),
            "deposit": float(data.get("deposit", 0)),
            "loan_amount": float(data.get("loan_amount", 0)),
            "interest_rate": float(data.get("interest_rate", 0)),
            "loan_term": int(data.get("loan_term", 0)),
            "rent": float(data.get("rent", 0)),
            "vacancy_rate": float(data.get("vacancy_rate", 0)),
            "council_rates": float(data.get("council_rates", 0)),
            "insurance": float(data.get("insurance", 0)),
            "maintenance": float(data.get("maintenance", 0)),
            "property_manager": float(data.get("property_manager", 0)),
            "wage_growth": float(data.get("wage_growth", 0)),
            "created_at": datetime.utcnow(),
        }

        # ✅ Robust parsing of owners
        owners_raw = data.get("owners", [])
        parsed_owners = []

        print("📦 Raw owners in request:", owners_raw)

        for owner in owners_raw:
            try:
                name = str(owner.get("name", "")).strip()
                ownership = owner.get("ownership")
                income = owner.get("income")

                if (
                    name
                    and isinstance(ownership, (int, float))
                    and float(ownership) > 0
                    and isinstance(income, (int, float))
                    and float(income) > 0
                ):
                    parsed_owners.append(
                        {
                            "name": name,
                            "ownership": float(ownership),
                            "income": float(income),
                        }
                    )
                else:
                    print(f"⚠️ Skipped invalid owner: {owner}")

            except Exception as e:
                print(f"❌ Failed to parse owner: {owner} — {e}")
                continue

        # 🛑 Stop if no valid owners
        if not parsed_owners:
            return jsonify({"error": "At least one valid owner is required."}), 400

        parsed["owners"] = parsed_owners

        # ✅ Insert into DB
        result = db.properties.insert_one(parsed)

        if not result.inserted_id:
            return jsonify({"error": "Insert failed"}), 500

        new_doc = db.properties.find_one({"_id": result.inserted_id})

        if not new_doc:
            return jsonify({"error": "Unable to retrieve inserted document"}), 500

        print("✅ Inserted:", new_doc)
        return jsonify(property_serializer(new_doc)), 201

    except Exception as e:
        print("❌ Error inserting property:", e)
        return jsonify({"error": str(e)}), 500


@bp.route("/<id>", methods=["PUT"])
def update_property(id):
    data = request.json
    result = db.properties.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.modified_count == 1:
        return jsonify({"message": "Property updated"})
    return jsonify({"error": "Property not found or not modified"}), 404


@bp.route("/<id>", methods=["DELETE"])
def delete_property(id):
    result = db.properties.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Property deleted"})
    return jsonify({"error": "Property not found"}), 404
