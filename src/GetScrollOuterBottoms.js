import React, { Component } from 'react';
import "./css/bootstrap.css";
import "./css/hover-min.css";
import "./css/style.css";
import "./css/font-awesome-4.7.0/css/font-awesome.min.css";

// web client can't read from directories so we'll hard-code this
const images = [
    "images/bottoms/bottoms_000.png",
    "images/bottoms/bottoms_001.png",
    "images/bottoms/bottoms_002.jpg",
    "images/bottoms/bottoms_003.jpg",
    "images/bottoms/bottoms_004.jpg",
    "images/bottoms/bottoms_005.png",
    "images/bottoms/bottoms_006.jpg",
    "images/bottoms/bottoms_007.jpg",
    "images/bottoms/bottoms_008.jpg",
    "images/bottoms/bottoms_009.jpg",
    "images/bottoms/bottoms_010.jpg",
    "images/bottoms/bottoms_011.jpg",
    "images/bottoms/bottoms_012.jpg",
    "images/bottoms/bottoms_013.jpg",
    "images/bottoms/bottoms_014.jpg",
    "images/bottoms/bottoms_015.jpg",
    "images/bottoms/bottoms_016.jpg"
]


class GetScrollOuterBottoms extends Component {

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

            <div className="scroll-outer-bottoms">
                <img src="images/chevronleft.png" className="prevTop" alt="Prev" onClick={this.previousItem}></img>
                <div className="scroll-inner-tops">
                    <img src={this.currentImage} className="activeTop"></img>
                </div>
                <img src="images/chevronright.png" className="nextTop" alt="Next" onClick={this.nextItem}></img>
            </div>
        );
    }
}

export default GetScrollOuterBottoms;
