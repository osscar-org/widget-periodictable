// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// Add any needed widget imports here (or from controls)
// import {} from '@jupyter-widgets/base';

import { createTestModel } from './utils';

import { MCPTableModel } from '..';

describe('Example', () => {
  describe('MCPTableModel', () => {
    it('should be createable', () => {
      const model = createTestModel(MCPTableModel);
      expect(model).toBeInstanceOf(MCPTableModel);
      expect(model.get('value')).toEqual('Hello World');
    });

    it('should be createable with a value', () => {
      const state = { value: 'Foo Bar!' };
      const model = createTestModel(MCPTableModel, state);
      expect(model).toBeInstanceOf(MCPTableModel);
      expect(model.get('value')).toEqual('Foo Bar!');
    });
  });
});
