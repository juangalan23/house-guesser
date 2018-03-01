import React from 'react';
import GridList from 'material-ui/GridList/GridList.js'
import GridListTile from 'material-ui/GridList/GridListTile.js'
import ReactDOM from 'react-dom';


const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      height: '80%'
    },
    gridList: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      height: '100%'
    },
    titleStyle: {
      color: 'rgb(0, 188, 212)'
      
    },
  };


class Images extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    render() {
      // console.log('props images ', this.props.images);
        return(
          <div style={styles.root} >
            <GridList style={styles.gridList} 
            cols={1.1} 
            > 
              {this.props.pics.map(image => {
                return (<GridListTile 
                title={"Hello"}
                key={image}
              > 
              <img src={image} />
                </GridListTile>)  
              } )}

            </GridList>
          </div>
        )
    }
}

export default Images;