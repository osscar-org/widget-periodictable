from setupbase import get_version  
from os.path import join as pjoin 
import json 

name = 'widget_periodictable'

version_py = get_version(pjoin(name, '_version.py'))  

with open('package.json') as json_file:
    data = json.load(json_file)

version_npm = data['version']

if version_py != version_npm :
    raise ValueError('The version number are NOT equal')
else:
    print(version_py)
    print('Check fine for the version number')

