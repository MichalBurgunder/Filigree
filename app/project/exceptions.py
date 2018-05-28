from rest_framework.exceptions import APIException


class TextDoesNotExist(APIException):
    status_code = 400
    default_detail = 'Text does not exist!'
    default_code = 'bad_request'
