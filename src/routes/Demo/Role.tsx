import React from 'react';
import { TreeSelect } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const TreeNode = TreeSelect.TreeNode;

export default class Role extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      value: undefined,
    };
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  render() {
    return (
      <PageHeaderLayout>
        <TreeSelect
          showSearch={true}
          style={{ width: 300 }}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear={true}
          treeDefaultExpandAll={true}
          onChange={this.onChange}
        >
          <TreeNode value="parent 1" title="parent 1" key="0-1">
            <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
              <TreeNode value="leaf1" title="my leaf" key="random" />
              <TreeNode value="leaf2" title="your leaf" key="random1" />
            </TreeNode>
            <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
              <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </PageHeaderLayout>
    );
  }
}
