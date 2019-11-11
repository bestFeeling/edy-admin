import React from 'react'
import BaseComponent from 'components/BaseComponent';
import { connect } from 'dva';

@connect(({ notice, loading }) => ({
  notice,
  loading: loading.models.notice
}))

export default class Test extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {

    return (
      <div>
        Test
      </div>
    )

  }

}
