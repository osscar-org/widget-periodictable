from setupbase import get_version  
from os.path import join as pjoin 
import json
from widget_periodictable._frontend import module_version 

name = 'widget_periodictable'

module_version = module_version[1:]
version_py = get_version(pjoin(name, '_version.py'))  

with open('package.json') as json_file:
    data = json.load(json_file)

version_npm = data['version']

if version_py != version_npm or module_version != version_npm:
    raise ValueError('The version number are NOT equal')
else:
    print(version_py)

