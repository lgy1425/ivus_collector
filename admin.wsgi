import sys
import logging
import os

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/home/mediwhale-2/Documents/ivus_collector")

from admin import app as application


