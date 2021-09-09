#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Dou Du.
# Distributed under the terms of the Modified BSD License.

import pytest

from ..periodic_table import PTableWidget


def test_example_creation_blank():
    w = PTableWidget()
    assert w.states == 1
