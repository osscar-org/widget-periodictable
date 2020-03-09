#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Giovanni Pizzi and Dou Du
# Distributed under the terms of the Modified BSD License.

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'nbextension/static',
        'dest': 'widget_periodictable',
        'require': 'widget_periodictable/extension'
    }]
