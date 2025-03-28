# backend/app/routes/properties.py

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
    data = request.json
    data["created_at"] = datetime.utcnow()
    result = db.properties.insert_one(data)
    return jsonify({"_id": str(result.inserted_id)}), 201


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
