import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Container } from '@material-ui/core'
import SubMenu from '../../containers/home/sub-menu'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import productCategoryProvider from '../../../../data-access/product-category-provider'
import abcProvider from '../../../../data-access/abc-provider'
import MenuItem from '../../containers/home/MenuLevel1'
// import axios from 'axios'
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            openSubMenu: false,
            openSubMenuHire:false,
            listForSale:[],
            listForHire:[],
            mainItem:[]
        }

    }

    componentDidMount(){
        this.getAllProductCategory()
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    setOpen = () =>{
       this.setState({
           openSubMenu:!this.state.openSubMenu
       })
    }

    getAllProductCategory=()=>{
        productCategoryProvider.getAll().then(res=>{
            console.log(res.Data.filter(x=>x.ParentProductCategoryId==1))
            this.setState({
                mainItem:res.Data.filter(x=>x.ParentProductCategoryId==1),
                // listForSale:res.Data.filter(x=>x.ParentProductCategoryId=="THUE"),
                // listForHire:res.Data.filter(x=>x.ParentProductCategoryId=="B"),
            })
        }).catch(e=>{
            console.log(e)
        })
    }


    render() {
        const { classes } = this.props
        const { isOpen } = this.state
        return (
            <div className="landb-header">
                <Navbar className="nav-fixed-top " color="light" light expand="md">
                    <div className="container">
                        <NavbarBrand className="logo-header" href="/">
                            <img src="/images/logo.png" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className=" mr-auto nav-main" navbar>
                                {this.state.mainItem.filter(x=>x.IsActive).map((item,index)=>{
                                    return(
                                    <MenuItem key={index} 
                                              data= {item}
                                              parentId ={item.ProductCategoryId}
                                              href={item.ProductCategoryKeyword}
                                    />
                                    )
                                   
                                })}
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}

const styles = theme => ({
    mainMenu: {
        position: 'relative!important',

    },
    subMenu:{
        position:'absolute',
        background:'#fff',
        zIndex:10,
        boxShadow:'0 8px 15px 1px rgba(0,0,0,0.3)',
        top:36
    },
    ul:{
        listStyle:'none',
        minWidth:300,
        padding: '8px 16px',
        margin:0,
        width:280
    },
    li:{
        padding:4
    }

});

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);