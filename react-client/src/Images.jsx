import React from 'react';
import IconButton from 'material-ui/IconButton';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import ReactDOM from 'react-dom';
import Grid from 'material-ui/Grid';
import StarBorderIcon from 'material-ui-icons/StarBorder';

const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      height: '100%'
    },
    gridList: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      height: '100%'
    },
    title: {
      color: 'primary.light'
      
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
  };

class Images extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    render() {
      if(this.props.houseData.bedrooms >1 ) {
        var bedrooms = "bedrooms"
    } else {
        var bedrooms = "bedroom"
    }

    if(this.props.houseData.bathrooms >1 ) {
        var bathrooms = "bathrooms"
    } else {
        var bathrooms = "bathroom"
    }

    var titleText = this.props.houseData.bedrooms+ ' ' +bedrooms+ ' '+
                            this.props.houseData.bedrooms+ ' '+ bathrooms +' house in '+
                            this.props.houseData.city + ', '+ this.props.houseData.stateInitials;

        return(
          <div style={styles.root} >

            <GridList style={styles.gridList} cols={1.1}  > 
              {this.props.pics.map((image, i) => {
                if( i ===0) {
                  var barTitle = <GridListTileBar 
                                title= {titleText} />

                } else {
                  var barTitle = null
                }
                return (<GridListTile key={image}
                    style={{height:'100%'}} > 

                    <img src={image} />
                    {barTitle}
                    
                      </GridListTile>)  
                    } )}
                
                  
            </GridList>

          </div>
        )
    }
}

export default Images;