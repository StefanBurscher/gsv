import React, { Component } from 'react';
import './Pagination.css';
import NavigationElement from './NavigationElement';


/**
 * There is 5 possible scenarios 
 * 
 * 1. There is 5 pages. In that case all 5 numbers are printed. Arrow are printed if selected page is not first or last.
 * 
 * 2, 3. When selected page is in first 3 or in last 3 scenario is very similar. 1 ... 4 5 6 where selected is in last 3 or 1 2 3 ... X where selected is in last 3
 */

class Pagination extends Component {

    constructor(props) {
        super(props);

        this.handleNavigationClick = this.handleNavigationClick.bind(this);
    }


    leftArrow(selected) {
        return selected !== 1 ?
            <li>
                <NavigationElement label="&lt;" className="paginationArrowElement" page={(selected - 1)} changePage={this.handleNavigationClick} />
            </li>
            : '';
    }
    rightArrow(selected, total) {
        return selected !== total ?
            <li>
                <NavigationElement label="&gt;" className="paginationArrowElement" page={(selected + 1)} changePage={this.handleNavigationClick} />
            </li>
            : '';
    }

    firstElement(selected, total) {
        if (this.firstPartSelected(selected) || total <= 5) {
            return '';
        } else {
            return <li><NavigationElement label="1" page="1" changePage={this.handleNavigationClick} /></li>;
        }
    }

    leftDots(selected, total) {
        if (this.firstPartSelected(selected) || total <= 5) {
            return '';
        } else {
            // return <li><Link className="paginationDotsElement" to={'?p=' + selected}>...</Link></li>;
            return <li><NavigationElement label="..." className="paginationDotsElement" page={selected} changePage={this.handleNavigationClick} /></li>;
        }
    }

    rightDots(selected, total) {
        if (this.lastPartSelected(selected, total) || (total <= 5)) {
            return '';
        } else {
            // return <li><Link className="paginationDotsElement" to={'?p=' + selected}>...</Link></li>;
            return <li><NavigationElement label="..." className="paginationDotsElement" page={selected} changePage={this.handleNavigationClick} /></li>;
        }
    }

    lastElement(selected, total) {
        if (this.lastPartSelected(selected, total) || (total <= 5)) {
            return '';
        } else {
            // return <li><Link to={'?p=' + total}>{total}</Link></li>;
            return <li><NavigationElement label={total} page={total} changePage={this.handleNavigationClick} /></li>;
        }
    }

    firstPartSelected(selected) {
        return selected <= 3 ? true : false;
    }
    lastPartSelected(selected, total) {
        return selected > (total - 3) ? true : false;
    }

    calculateTotalNumOfPages(totalNumOfRows, rowsPerPage) {
        let quotient = Math.floor(totalNumOfRows / rowsPerPage);
        let remainder = totalNumOfRows % rowsPerPage;
        if (remainder > 0) {
            quotient++;
        }
        return quotient;
    }

    calculateCurrentPage(offset, rowsPerPage) {
        return ((offset / rowsPerPage) + 1);
    }

    handleNavigationClick(page) {
        const offset = (page - 1) * this.props.limit;
        this.props.changePage(offset, this.props.limit);
    }

    render() {

        //Total is number of pages
        const total = this.calculateTotalNumOfPages(this.props.count, this.props.limit);
        if (total > 1) {
            const selected = this.calculateCurrentPage(this.props.offset, this.props.limit);

            let middleElements = [];
            if (total <= 5) {
                //Print all
                middleElements = [...Array(total).keys()].map(i => ++i);
            } else {
                if (this.firstPartSelected(selected)) {
                    middleElements = [...Array(3).keys()].map(i => ++i);

                } else if (this.lastPartSelected(selected, total)) {
                    for (let i = total - 2; i <= total; i++) {
                        middleElements.push(i);
                    }
                } else {
                    
                    if (selected <= 4) {
                        middleElements = [selected, (selected + 1), (selected + 2)];
                    } else if (selected >= (total - 4)) {
                        middleElements = [(selected - 2), (selected - 1), selected];

                    } else {
                        middleElements = [(selected - 1), selected, (selected + 1)]
                    }

                    // With 5 buttons in the middle
                    
                    // if (selected === 4 || selected === 5) {
                    //     middleElements = [selected, (selected + 1), (selected + 2)];

                    // } else if (selected === (total - 3) || selected === (total - 4)) {
                    //     middleElements = [(selected - 2), (selected - 1), selected];

                    // } else if (total > 5 && total <= 9) {
                    //     middleElements = [(selected - 1), selected, (selected + 1)];

                    // } else {
                    //     middleElements = [(selected - 2), (selected - 1), selected, (selected + 1), (selected + 2)];
                    // }
                }
            }

            return (
                <ul className="paginationContainer">
                    {this.leftArrow(selected)}
                    {this.firstElement(selected, total)}
                    {this.leftDots(selected, total)}
                    {
                        middleElements.map(
                            i => i === selected ?
                                <li key={i}><NavigationElement className="paginationSelectedElement" label={i} page={i} changePage={this.handleNavigationClick} /></li> :
                                <li key={i}><NavigationElement label={i} page={i} changePage={this.handleNavigationClick} /></li>
                        )
                    }
                    {this.rightDots(selected, total)}
                    {this.lastElement(selected, total)}
                    {this.rightArrow(selected, total)}
                </ul>
            );
        } else return (
            ''
        )
    }
}

export default Pagination;