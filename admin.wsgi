import sys
import logging
import os

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/home/mediwhale/PycharmProjects/fundus_gui")

from admin import app as application


