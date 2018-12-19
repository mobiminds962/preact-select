import { h, render, Component } from 'preact';
import style from './style';

class Select extends Component{
  constructor(props){
    super(props)
    console.log(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
    this.close = this.close.bind(this)
  }

  componentDidUpdate(){
    const { listOpen } = this.state
    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close)
      }
      else{
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  close(timeOut){
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id){
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.resetThenSet(id))
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <div class={style.dd_wrapper}>
        <div class={style.dd_header} onClick={() => this.toggleList()}>
          <div class={style.dd_header_title}>{headerTitle}</div>
          {listOpen
            ? <span>Up</span>
            : <span>Down</span>
          }
        </div>
        {listOpen && <ul class={style.dd_list} onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <li class={style.dd_list_item} key={item.id} onClick={() => this.selectItem(item.title, item.id)}>{item.title}</li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default Select