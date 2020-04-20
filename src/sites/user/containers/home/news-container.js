import React from 'react'

import NewsItem from './news-hot-item';
import newsProvider from  '../../../../data-access/news-provider'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";
class NewsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            listNews:[]
        }
    }

    componentDidMount(){
        this.getListNews()
    }

    getListNews(){
        newsProvider.getAll().then(res=>{
            console.log(res)
            if(res.Code==200){
                this.setState({
                    listNews:res.Data
                })
            }
        }).catch(e=>{console.log(e)})
    }

    render() {
        const  {listNews} = this.state
        return (
            <div className="container mgbt30 pdt50" >
                <div className="row">
                    <div className="col-sm-12 col-md-8 fll box-news-hot">

                        <div className="box-title-hot fll">
                            <span><i className="fal fa-newspaper" /></span>
                            <h2>Tin tức</h2>
                        </div>
                        {/* to={{ pathname: '/tin-dang', state: { product: this.props.data }, }}  */}
                        <Link to={{pathname:'/tin-tuc',state:{new : this.state.listNews}}} title="tin tức" className="flr line-height45 see-all">Xem tất cả<i className="fal fa-chevron-double-right mgl5 font10" /></Link>
                        <p className="clb"></p>
                        {
                            listNews.slice(0,5).map((item, index) => {
                                return (
                                    <NewsItem 
                                    time = {item.CreateDtime}
                                    title= {item.NewName}
                                    image={item.NewImage}
                                    data={item}
                                    key={index} />
                                    
                                )

                            })
                        }

                    </div>
                    <div className="col-sm-12 col-md-4 flr box-ads-new-hot">
                        <p className="txt-center mgbt30 ng-scope ads-new-1" >
                            <a  target="_blank" >
                                <img ng-src="https://s3-ap-southeast-1.amazonaws.com/landber/71f3010e-1dd3-454c-905c-8ca2f17c9442.jpg" src="https://s3-ap-southeast-1.amazonaws.com/landber/71f3010e-1dd3-454c-905c-8ca2f17c9442.jpg" />
                            </a>
                        </p>


                        <p className="txt-center ng-scope" >
                            <a  target="_blank">
                                <img ng-src="https://s3-ap-southeast-1.amazonaws.com/landber/a58a467c-a2b8-4260-a550-cf72ea28c1a9.jpg" src="https://s3-ap-southeast-1.amazonaws.com/landber/a58a467c-a2b8-4260-a550-cf72ea28c1a9.jpg" />
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        )
    }
}
export default NewsContainer