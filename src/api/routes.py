"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from flask import Flask, request, jsonify, url_for, Blueprint, json, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_mail import Message
from flask_mail import Mail
import random 
import string
import requests


api = Blueprint('api', __name__)


@api.route('https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
#  hacemos una consulta a la tabla para saber si el user existe
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "User doesn´t exist"}), 404
    
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



@api.route("https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/profile", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    print(user.serialize())
    # return jsonify(logged_in_as=current_user), 200
    return jsonify({"result":user.serialize()}), 200

# User profile modificación de los datos de usuario (ruta privada)
@api.route('https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/profile', methods=['PUT'])
@jwt_required()
def user_profile_update():
    user = get_jwt_identity()
    # name = request.json.get("name")
    password = request.json.get("password")
    
    user_update = User.query.filter_by(email=user).first()
    user_update.password = password

    db.session.commit()
    response_body = {
        "message": "Usuario modificado correctamente"
    }
    return jsonify(response_body),200


@api.route("https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/profile", methods=["DELETE"])
@jwt_required()
def delete_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    delete_user = User.query.filter_by(email=current_user).first()

    db.session.delete(delete_user)
    db.session.commit()

    response_body = {
        "result": "Cuenta eliminada con éxito"
    }
    return jsonify(response_body), 200


# user registration
@api.route('https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/register', methods=['POST'])
def register():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()
    # print(user)

    if user is None : 
        user = User(email = email, password = password)
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg":"Usuario creado con exito"})
    else :
        return jsonify({"msg": "email ya registrado"}), 402
    
    response_body = {
        "message": "Usuario registrado correctamente"
    }
    return jsonify(response_body), 200 


@api.route("https://3001-pas0ta-authenpyflask-op69hxykj7c.ws-eu93.gitpod.io/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    # Access the identity of the current user with get_jwt_identity

    current_user = get_jwt_identity()
    
    user = User.query.filter_by(email=current_user).first()
    if user != None:
        
    # print(user)
        return jsonify({"isLogged":True}), 200
    else:
        return jsonify({"isLogged":False}), 401