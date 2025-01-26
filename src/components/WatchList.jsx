import React from 'react'
import '../styles/watchList.css'
import { useDispatch, useSelector } from 'react-redux'

const WatchList = () => {
    const dispatch = useDispatch();
    

    const watchListData = useSelector((state) => state.user.userInfo)

    // const watchList = watchListData.wishlist.map((item, key) => {
    //     if (item.favorite) {
    //         return (
    //             <tr key={key}>
    //                 <td>{ item.ticker}</td>
    //             </tr>
    //         )
    //     }
    //     return null
        
    // })
    const wishList = watchListData.wishlist.filter((item) => item.favorite).map((item, key) => {
        return (
            <tr key={key}>
                <td>{ item.ticker}</td>
            </tr>
        )
    })

    console.log("wishlist", wishList)
    return (
        <>
            <div className="watchlist-holder">
                <div className="watchlist">
                    <div className='menu-title'>
                        Watchlist
                    </div>

                    <table className='lg:ml-8'>
                        <thead>
                            <tr>
                                <th align='left'>Stock</th>
                                {/* <th>24H High</th>
                                <th>24H High</th>
                                <th>Price</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {wishList}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default WatchList