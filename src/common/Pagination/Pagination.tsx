import s from './Pagination.module.scss'
import React from "react";


type PropsType = {
    page: number | null
    pageCount: number | null
    cardPacksTotalCount: number | null
    paginate: (page: number) => void
}

const Pagination: React.FC<PropsType> = (props) => {
    let numberOfPages
    if (props.cardPacksTotalCount && props.pageCount) {
        numberOfPages = Math.ceil(props.cardPacksTotalCount / props.pageCount)
    } else {
        numberOfPages = 1
    }
    const listOfPages = []

    for (let i = 1; i <= numberOfPages; i++) {
        listOfPages.push(i)
    }

    const onClickHandler = (page: number) => {
        props.paginate(page)
    }
    return (
        <div className={s.container}>
            {listOfPages.map((page, index) =>
                (<span className={`${s.pageSpan} ${page===props.page && s.active}`} key={page} onClick={() => {
                    onClickHandler(page)
                }}>{page}</span>)
            )}
        </div>
    )
}

export default Pagination