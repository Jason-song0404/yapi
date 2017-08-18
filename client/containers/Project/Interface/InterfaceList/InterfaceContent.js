import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Tabs } from 'antd';
import Edit from './Edit.js'
import View from './View.js'

import { fetchInterfaceData } from '../../../../reducer/modules/interface.js';
import { withRouter } from 'react-router-dom';
import Run from './Run/Run.js'


const TabPane = Tabs.TabPane;
@connect(
  state => {
    return {
      curdata: state.inter.curdata,
      list: state.inter.list
    }
  },
  {
    fetchInterfaceData
  }
)
class Content extends Component {
  static propTypes = {
    match: PropTypes.object,
    list: PropTypes.array,
    curdata: PropTypes.object,
    fetchInterfaceData: PropTypes.func,
    history: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
      curtab: 'view'
    }
    this._actionId = 0;
  }

  componentWillMount() {
    this.handleRequest(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequest(nextProps)
  }

  handleRequest(nextProps) {
    let matchParams = nextProps.match.params;

    if (!matchParams.actionId && (nextProps.list.length > 0)) {
      return this.props.history.replace('/project/' + matchParams.id + '/interface/api/' + nextProps.list[0]._id)
    }
    if (matchParams.actionId && this._actionId !== matchParams.actionId) {
      this._actionId = matchParams.actionId;
      this.props.fetchInterfaceData(matchParams.actionId)
    }
    this.setState({
      curtab: 'view'
    })
  }

  onChange = (key) => {
    this.setState({
      curtab: key
    })
  }

  render() {
    const tabs = <Tabs onChange={this.onChange} activeKey={this.state.curtab} defaultActiveKey="view"   >
      <TabPane tab="预览" key="view">
        {/* <View /> */}
      </TabPane>
      <TabPane tab="编辑" key="edit">

      </TabPane>
      <TabPane tab="运行" key="run">
        {/* <Run /> */}
      </TabPane>
    </Tabs>;
    let tabContent;
    if (this.state.curtab === 'view') {
      tabContent = <View />;
    } else if (this.state.curtab === 'edit') {
      tabContent = <Edit />
    } else if (this.state.curtab === 'run') {
      tabContent = <Run />
    }

    return <div className="interface-content">
      {tabs}
      {tabContent}
    </div>
  }
}

export default withRouter(Content)
