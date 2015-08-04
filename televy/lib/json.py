from __future__ import absolute_import

from datetime import datetime

from flask import abort, request
from flask.json import JSONEncoder


class AnalyticsJSONEncoder(JSONEncoder):

    def default(self, obj):
        fmt = fmt = '%Y-%m-%d'

        if isinstance(obj, datetime):
            return obj.strftime(fmt)
        return JSONEncoder.default(self, obj)


def json_required(f):
    def decorator(*args, **kwargs):
        if not (request.headers['Accept'] == 'application/json'
                or request.headers['Content-Type'] == 'application/json'):
            abort(401)
        return f(*args, **kwargs)
    return decorator
