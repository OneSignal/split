import React from 'react';
import PropTypes from 'prop-types';
import Split from 'split.js';

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var SplitWrapper = /*@__PURE__*/(function (superclass) {
    function SplitWrapper () {
        superclass.apply(this, arguments);
    }

    if ( superclass ) SplitWrapper.__proto__ = superclass;
    SplitWrapper.prototype = Object.create( superclass && superclass.prototype );
    SplitWrapper.prototype.constructor = SplitWrapper;

    SplitWrapper.prototype.componentDidMount = function componentDidMount () {
        var ref = this.props;
        ref.children;
        var gutter = ref.gutter;
        var rest = objectWithoutProperties( ref, ["children", "gutter"] );
        var options = rest;

        options.gutter = function (index, direction) {
            var gutterElement;

            if (gutter) {
                gutterElement = gutter(index, direction);
            } else {
                gutterElement = document.createElement('div');
                gutterElement.className = "gutter gutter-" + direction;
            }

            // eslint-disable-next-line no-underscore-dangle
            gutterElement.__isSplitGutter = true;
            return gutterElement
        };

        this.split = Split(this.parent.children, options);
    };

    SplitWrapper.prototype.componentDidUpdate = function componentDidUpdate (prevProps) {
        var this$1 = this;

        var ref = this.props;
        ref.children;
        var minSize = ref.minSize;
        var sizes = ref.sizes;
        var collapsed = ref.collapsed;
        var rest = objectWithoutProperties( ref, ["children", "minSize", "sizes", "collapsed"] );
        var options = rest;
        var prevMinSize = prevProps.minSize;
        var prevSizes = prevProps.sizes;
        var prevCollapsed = prevProps.collapsed;

        var otherProps = [
            'maxSize',
            'expandToMin',
            'gutterSize',
            'gutterAlign',
            'snapOffset',
            'dragInterval',
            'direction',
            'cursor' ];

        var needsRecreate = otherProps
            // eslint-disable-next-line react/destructuring-assignment
            .map(function (prop) { return this$1.props[prop] !== prevProps[prop]; })
            .reduce(function (accum, same) { return accum || same; }, false);

        // Compare minSize when both are arrays, when one is an array and when neither is an array
        if (Array.isArray(minSize) && Array.isArray(prevMinSize)) {
            var minSizeChanged = false;

            minSize.forEach(function (minSizeI, i) {
                minSizeChanged = minSizeChanged || minSizeI !== prevMinSize[i];
            });

            needsRecreate = needsRecreate || minSizeChanged;
        } else if (Array.isArray(minSize) || Array.isArray(prevMinSize)) {
            needsRecreate = true;
        } else {
            needsRecreate = needsRecreate || minSize !== prevMinSize;
        }

        // Destroy and re-create split if options changed
        if (needsRecreate) {
            options.minSize = minSize;
            options.sizes = sizes || this.split.getSizes();
            this.split.destroy(true, true);
            options.gutter = function (index, direction, pairB) { return pairB.previousSibling; };
            this.split = Split(
                Array.from(this.parent.children).filter(
                    // eslint-disable-next-line no-underscore-dangle
                    function (element) { return !element.__isSplitGutter; }
                ),
                options
            );
        } else if (sizes) {
            // If only the size has changed, set the size. No need to do this if re-created.
            var sizeChanged = false;

            sizes.forEach(function (sizeI, i) {
                sizeChanged = sizeChanged || sizeI !== prevSizes[i];
            });

            if (sizeChanged) {
                // eslint-disable-next-line react/destructuring-assignment
                this.split.setSizes(this.props.sizes);
            }
        }

        // Collapse after re-created or when collapsed changed.
        if (
            Number.isInteger(collapsed) &&
            (collapsed !== prevCollapsed || needsRecreate)
        ) {
            this.split.collapse(collapsed);
        }
    };

    SplitWrapper.prototype.componentWillUnmount = function componentWillUnmount () {
        this.split.destroy();
        delete this.split;
    };

    SplitWrapper.prototype.render = function render () {
        var this$1 = this;

        var ref = this.props;
        ref.sizes;
        ref.minSize;
        ref.maxSize;
        ref.expandToMin;
        ref.gutterSize;
        ref.gutterAlign;
        ref.snapOffset;
        ref.dragInterval;
        ref.direction;
        ref.cursor;
        ref.gutter;
        ref.elementStyle;
        ref.gutterStyle;
        ref.onDrag;
        ref.onDragStart;
        ref.onDragEnd;
        ref.collapsed;
        var children = ref.children;
        var rest$1 = objectWithoutProperties( ref, ["sizes", "minSize", "maxSize", "expandToMin", "gutterSize", "gutterAlign", "snapOffset", "dragInterval", "direction", "cursor", "gutter", "elementStyle", "gutterStyle", "onDrag", "onDragStart", "onDragEnd", "collapsed", "children"] );
        var rest = rest$1;

        return (
            React.createElement( 'div', Object.assign({},
                { ref: function (parent) {
                    this$1.parent = parent;
                } }, rest),
                children
            )
        )
    };

    return SplitWrapper;
}(React.Component));

SplitWrapper.propTypes = {
    sizes: PropTypes.arrayOf(PropTypes.number),
    minSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number) ]),
    maxSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number) ]),
    expandToMin: PropTypes.bool,
    gutterSize: PropTypes.number,
    gutterAlign: PropTypes.string,
    snapOffset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number) ]),
    dragInterval: PropTypes.number,
    direction: PropTypes.string,
    cursor: PropTypes.string,
    gutter: PropTypes.func,
    elementStyle: PropTypes.func,
    gutterStyle: PropTypes.func,
    onDrag: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    collapsed: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.element),
};

SplitWrapper.defaultProps = {
    sizes: undefined,
    minSize: undefined,
    maxSize: undefined,
    expandToMin: undefined,
    gutterSize: undefined,
    gutterAlign: undefined,
    snapOffset: undefined,
    dragInterval: undefined,
    direction: undefined,
    cursor: undefined,
    gutter: undefined,
    elementStyle: undefined,
    gutterStyle: undefined,
    onDrag: undefined,
    onDragStart: undefined,
    onDragEnd: undefined,
    collapsed: undefined,
    children: undefined,
};

export default SplitWrapper;
