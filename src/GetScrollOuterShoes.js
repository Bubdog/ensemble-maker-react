import React, { Component } from 'react';
import "./css/bootstrap.css";
import "./css/hover-min.css";
import "./css/style.css";
import "./css/font-awesome-4.7.0/css/font-awesome.min.css";

// web client can't read from directories so we'll hard-code this
const images = [
    "images/shoes/shoes_000.png",
    "images/shoes/shoes_001.jpg",
    "images/shoes/shoes_002.jpg",
    "images/shoes/shoes_003.png",
    "images/shoes/shoes_004.jpg",
    "images/shoes/shoes_005.jpg",
    "images/shoes/shoes_006.jpg",
    "images/shoes/shoes_007.jpg",
    "images/shoes/shoes_008.png",
    "images/shoes/shoes_009.jpg",
    "images/shoes/shoes_010.jpg",
    "images/shoes/shoes_011.jpg",
    "images/shoes/shoes_012.jpg",
    "images/shoes/shoes_013.jpg",
    "images/shoes/shoes_014.jpg",
    "images/shoes/shoes_015.jpg",
    "images/shoes/shoes_016.jpg"
]


class GetScrollOuterShoes extends Component {

    constructor(props) {
        super(props);
        this.currentImageIndex = 0;
        this.currentImage = images[this.currentImageIndex];
        // This binding is necessary to make `this` work in the callback
        this.previousItem = this.previousItem.bind(this);
        this.item = { selected: this.currentImage };
        this.nextItem = this.nextItem.bind(this);

    }
    getItem() {
        this.item = { selected: this.currentImage };
        return this.item;
    }
    nextItem() {
        if (this.currentImageIndex == (images.length - 1)) {
            this.currentImageIndex = 0;
        }
        else {
            this.currentImageIndex = this.currentImageIndex + 1;
        }
        this.currentImage = images[this.currentImageIndex];
        this.forceUpdate();
    }
    previousItem() {
        if (this.currentImageIndex == 0) {
            this.currentImageIndex = images.length - 1;
        }
        else {
            this.currentImageIndex = this.currentImageIndex - 1;
        }
        this.currentImage = images[this.currentImageIndex];
        this.forceUpdate();
    }

    render() {

        return (

            <div className="scroll-outer-shoes">
                <img src="images/chevronleft.png" className="prevTop" alt="Prev" onClick={this.previousItem}></img>
                <div className="scroll-inner-tops">
                    <img src={this.currentImage} className="activeTop"></img>
                </div>
                <img src="images/chevronright.png" className="nextTop" alt="Next" onClick={this.nextItem}></img>
            </div>

        );
    }
}

export default GetScrollOuterShoes;
