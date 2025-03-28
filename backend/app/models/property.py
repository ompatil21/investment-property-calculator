# backend/app/models/property.py


def property_serializer(property_doc):
    return {
        "_id": str(property_doc["_id"]),
        "title": property_doc.get("title"),
        "location": property_doc.get("location"),
        "type": property_doc.get("type"),
        "purchase_price": property_doc.get("purchase_price"),
        "deposit": property_doc.get("deposit"),
        "loan_amount": property_doc.get("loan_amount"),
        "interest_rate": property_doc.get("interest_rate"),
        "loan_term": property_doc.get("loan_term"),
        "rent": property_doc.get("rent"),
        "vacancy_rate": property_doc.get("vacancy_rate"),
        "expenses": property_doc.get("expenses"),
        "created_at": property_doc.get("created_at"),
    }
