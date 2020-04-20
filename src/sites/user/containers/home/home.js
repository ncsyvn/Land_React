import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedsTop from './feedTop'
import SlideNews from './product'
import SlideHire from './hire'
import RegisterEmail from './register-email'
import NewsContainer from './news-container'
import Fade from 'react-reveal/Fade';
import productProvider from '../../../../data-access/product-provider'

import productCategoryProvider from '../../../../data-access/product-category-provider';
import listDistrict from '../../../../data-access/district-provider'
import listHire from '../../../../data-access/pricehire-provider'
import listSold from '../../../../data-access/pricesold-provider'
import listArea from '../../../../data-access/area-provider'
//UI
import { ClickAwayListener } from '@material-ui/core';

const listCategoryOfProduct = []

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listNews: [],
            listHire: [],
            listSold: [],

            activeLeft: false,
            districtId: '',
            districtName: '',
            address: '',
            activeAddress: false,
            activeCategory: false,
            activePrice: false,
            activeArea: false,
            priceTitle: "Giá",
            fromPrice: '',
            toPrice: '',
            fromArea: '',
            toArea: '',
            categoryName: "Loại ",
            areaTitle: 'Diện tích',
            ParentProductCategory: '',
            ProductCategoryId: '',
            lstCategoryProduct: [],
            listProductSearch: [],
            lat: '',
            lon: '',
            activeProject: false,
            activeIndex: 0,
            listCategory: [],
            defaultCategoryId: '',

        }
    }

    componentDidMount() {
        this.loadPage()
    }

    loadPage() {
        this.getlistHire()
        this.loadProductCategory()
    }

    // setListCategory(){
    //     console.log()
    // }


    getlistHire() {
        productProvider.getAll().then(res => {
            if (res.Code == 200) {
                this.setState({
                    listHire: res.Data
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }
    //slider
    loadProductCategory() {
        productCategoryProvider.getAll().then(res => {
            if (res.Code == 200) {
                this.setState({
                    listCategory: res.Data.filter(x => x.ParentProductCategoryId == 1),
                    defaultCategoryId: res.Data[0].ProductCategoryId
                }, () => {
                    // for(let i = 0 ; i<this.state.listCategory.length;i++){
                    //     productCategoryProvider.getByParent(this.state.listCategory[i].ProductCategoryId).then(res=>{
                    //         console.log(res)
                    //         let dict = {}
                    //     })
                    // }
                    this.setState({
                        lstCategoryProduct:res.Data.filter(x=>x.ParentProductCategoryId===this.state.defaultCategoryId)
                    })
                    this.state.listCategory.map((item, index) => {
                        productCategoryProvider.getByParent(item.ProductCategoryId).then(res => {
                            let district = {}
                            district.key = item.ProductCategoryId
                            district.value = res.Data
                            listCategoryOfProduct.push(district)
                        })
                    })
                    console.log(listCategoryOfProduct)
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    handleClickLeft = () => {
        this.setState({
            activeLeft: true,
        })
    }

    handleClickRight = () => {
        this.setState({
            activeLeft: false,
        })
    }

    selectDistrict = (item, name, lat, lon) => {
        this.setState({
            activeAddress: false,
            districtId: item,
            districtName: name,
            lat: lat,
            lon: lon
        })
    }


    openAddress = () => {
        this.setState({
            activeAddress: !this.state.activeAddress,
        })
    }

    searchAllProduct = () => {
        let param = {
            ProductCategoryId: this.state.ProductCategoryId,
            ProductPriceStart: this.state.fromPrice,
            ProductPriceEnd: this.state.toPrice,
            ProductAreaStart: this.state.fromArea,
            ProductAreaEnd: this.state.toArea,
            ProductAddress: this.state.districtName,
            ParentProductCategoryId: this.state.parentCategoryId
        }
        productProvider.search(param).then(res => {
            if (res.Code == 200) {
                this.setState({
                    listProductSearch: res.Data
                }, () => {
                    this.props.history.push({
                        pathname: '/san-pham',
                        state: {
                            data: this.state.listProductSearch,
                            productAddress: this.state.districtName,
                            lat: this.state.lat,
                            lon: this.state.lon
                        }
                    })
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    activeIndex = (id, index) => {
        this.setState({
            parentCategoryId: id,
            activeIndex: index,
            
        }, () => {
            console.log(listCategoryOfProduct.filter(x => x.key === this.state.parentCategoryId).map(item => item.value))
            this.setState({
                lstCategoryProduct: listCategoryOfProduct.filter(x => x.key === this.state.parentCategoryId).map(item => item.value)
            })
        })
    }


    render() {
        const { classes } = this.props
        return (
            <div>
                {/* <Slider /> */}

                <div className={classes.slider + ' ' + 'slider-home'}>
                    <div className="container">
                        <div className="home-search">
                            <h1 className="slogan">
                                Tìm kiếm bất động sản<br /> với hơn 20.000 tin mỗi ngày
                        </h1>
                            <p className="txt-center lst-btn-loaitin clb">
                                {this.state.listCategory.map((item, index) => {
                                    return (
                                        <a key={index} onClick={() => this.activeIndex(item.ProductCategoryId, index)} className={(this.state.activeIndex == index) ? "btn-loaitin mgr10 active" : "btn-loaitin mgr10 "} >{item.ProductCategoryTitle}</a>
                                    )

                                })}
                            </p>

                            <div className="box-search-input clb position-re font18">
                                <input onChange={(event) => this.setState({ districtName: event.target.value })} value={this.state.districtName} type="text" className="fll pdl10 ng-pristine ng-valid ui-autocomplete-input ng-not-empty ng-touched" />
                                <a onClick={this.openAddress} style={{ color: '#00000' }} className="select-city-search fll" title="Thành phố">
                                    Địa điểm
                                <i className="fas fa-chevron-down"></i>
                                    {
                                        this.state.activeAddress ?
                                            <ClickAwayListener onClickAway={this.openAddress}>
                                                <div >
                                                    {
                                                        <div className="list-data-address">
                                                            <p className="title-chon-tinh">
                                                                CHỌN QUẬN/HUYỆN
                                                        </p>
                                                            <ul className="list-tinh">
                                                                {listDistrict.map((item, index) => {
                                                                    return (
                                                                        <li key={index} onClick={() => this.selectDistrict(item.ID, item.Title, item.lat, item.lon)}>{item.Title}</li>
                                                                    )
                                                                })}

                                                            </ul>
                                                        </div>
                                                    }
                                                </div>
                                            </ClickAwayListener>
                                            : ""}
                                </a>
                                <button onClick={this.searchAllProduct} className="btn-search-home flr" >
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>

                            <div className="rowduoi">
                                <ClickAwayListener onClickAway={() => this.setState({ activeCategory: false })}>
                                    <div onClick={() => this.setState({ activeCategory: !this.state.activeCategory })} className="select col-md-4 ">{this.state.categoryName}
                                        <i className="fas fa-chevron-down"></i>
                                        {this.state.activeCategory && this.state.lstCategoryProduct.length >= 1 ?
                                            <div className="list-cateproduct">
                                                {this.state.lstCategoryProduct[0].length ?
                                                    <ul className="list-loaisp">
                                                        {
                                                            this.state.lstCategoryProduct[0].map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => this.setState({ProductCategoryId:item.ProductCategoryId, categoryName: item.ProductCategoryTitle })} key={index}>{item.ProductCategoryTitle}</li>
                                                                )

                                                            })
                                                        }
                                                    </ul>
                                                    : <ul className="list-loaisp">
                                                        {
                                                            this.state.lstCategoryProduct.map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => this.setState({ProductCategoryId:item.ProductCategoryId, categoryName: item.ProductCategoryTitle })} key={index}>{item.ProductCategoryTitle}</li>
                                                                )

                                                            })
                                                        }
                                                    </ul>}

                                            </div> : ""
                                        }

                                    </div>
                                </ClickAwayListener>
                                <ClickAwayListener onClickAway={() => this.setState({ activePrice: false })}>
                                    <div onClick={() => { this.setState({ activePrice: !this.state.activePrice }) }} className="select col-md-4 mg08">
                                        {this.state.priceTitle}
                                        <i className="fas fa-chevron-down"></i>
                                        {this.state.activePrice ?
                                            <ul className="list-price">
                                                {this.state.activeIndex===0||this.state.activeIndex===1 ?
                                                    listSold.map((item, index) => {
                                                        return (
                                                            <li onClick={() => { this.setState({ priceTitle: item.title, fromPrice: item.from, toPrice: item.to }) }} key={index}>{item.title}</li>
                                                        )
                                                    })
                                                    :
                                                    listHire.map((item, index) => {
                                                        return (
                                                            <li onClick={() => { this.setState({ priceTitle: item.title, fromPrice: item.from, toPrice: item.to }) }} key={index}>{item.title}</li>
                                                        )
                                                    })
                                                }
                                            </ul> : ""}
                                    </div>
                                </ClickAwayListener>
                                <ClickAwayListener onClickAway={() => this.setState({ activeArea: false })}>
                                    <div onClick={() => { this.setState({ activeArea: !this.state.activeArea }) }} className="select col-md-4">
                                        {this.state.areaTitle}
                                        <i className="fas fa-chevron-down"></i>
                                        {
                                            this.state.activeArea ?
                                                <ul className="list-area">
                                                    {listArea.map((item, index) => {
                                                        return (
                                                            <li key={index} onClick={() => this.setState({ areaTitle: item.title, fromArea: item.from, toArea: item.to })}>{item.title}</li>
                                                        )
                                                    })}

                                                </ul>
                                                : ""}
                                    </div>
                                </ClickAwayListener>
                            </div>

                        </div>

                    </div>
                </div>



                <div className={classes.homeContent + " " + "content"}>
                    <Fade bottom>
                        <FeedsTop />
                    </Fade>



                    <Fade bottom>
                        <SlideNews slideItems={this.state.listHire} />
                    </Fade>
                    <Fade bottom>
                        <SlideHire slideItems={this.state.listHire} />
                    </Fade>
                    <Fade bottom>
                        <NewsContainer />
                    </Fade>
                    <Fade bottom>
                        <RegisterEmail />
                    </Fade>


                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}

const styles = theme => ({
    homeContent: {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'block',
        paddingTop: 50,
    },
    backGround: {
        marginTop: 10
    },
    slider: {
        backgroundImage: `url(/images/slider1.jpg)`,
        position: 'relative',
        top: 56,
        width: '100%',
    }
});


Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Home));