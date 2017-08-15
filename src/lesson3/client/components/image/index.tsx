import * as React from 'react';

class Image extends React.PureComponent<any, any> {
  private static propTypes = {
    className: React.PropTypes.string,
    src: React.PropTypes.string.isRequired,
  };

  private static defaultProps = {
    className: '',
  };

  constructor() {
    super();
    this.state = {
      src: '',
    };
  }

  public componentDidMount() {
    // eslint里有一条规则是no-did-mount-set-state，但是tslint里没有
    // eslint规则解释到是为了避免布局抖动，因为setState会导致重新render
    // 相当于一开始render后又render了一遍，所以setState会建议放在willMount里执行
    // 但是在同构的情况下，willMount会在服务端执行，而didMount并不会，
    // 我们的需求是在didMount后进行src的赋值，这样load事件就不会被阻塞
    // 所以这条规则可以eslint-disable
    this.setState({
      src: this.props.src,
    });
  }

  public render() {
    const { className } = this.props;
    const { src } = this.state;
    return (
      <img src={src} className={className} alt='loading' />
    );
  }
}

export default Image;
