import { useReducer, useRef } from "react"

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

const actionTypes = {
    rate: "rate",
    hover: "hover",
    setState: "setState",
}

const eventTypes = {
    hover: "hover",
    mouseLeave: "mouseLeave",
    removeRating: "removeRating",
    setRating: "setRating",
}

const wasRated = event => [eventTypes.setRating, eventTypes.removeRating].includes(event)

const ratingReducer = (previous, action) => {
    if (action.type === actionTypes.rate) {
        const toggled = previous.rating === action.rating
        const next = {
            ...previous,
            rating: toggled ? 0 : action.rating,
            lastEvent:
                toggled && previous.rating
                    ? eventTypes.removeRating
                    : eventTypes.setRating,
        }

        return next
    } else if (action.type === actionTypes.hover) {
        const lastEvent =
            action.hoverIndex === null ? eventTypes.mouseLeave : eventTypes.hover

        const next = {
            ...previous,
            hoverIndex: action.hoverIndex,
            lastEvent,
        }

        return next
    }

    throw new Error(`Unsupported type: ${action.type}`)
}

const useRating = ({ onChange, controlledState, maxRating } = {}) => {
    const { current: initialState } = useRef({
        rating: 0,
        hoverIndex: null,
        lastEvent: actionTypes.mouseLeave,
    })
    const [stateFromReducer, dispatch] = useReducer(ratingReducer, initialState)

    const stateIsControlled = controlledState !== undefined
    const state = stateIsControlled ? controlledState : stateFromReducer

    const dispatchWithOnChange = action => {
        if (!stateIsControlled) {
            dispatch(action)
        }

        if (onChange) {
            const nextState = ratingReducer(state, action)
            onChange(nextState, action)
        }
    }

    const rate = newRating => {
        dispatchWithOnChange({ type: actionTypes.rate, rating: newRating })
    }
    const hover = hoverIndex => {
        dispatchWithOnChange({ type: actionTypes.hover, hoverIndex })
    }

    const getButtonProps = ({
        index,
        onClick,
        onMouseEnter,
        onMouseLeave,
        ...otherProps
    }) => {
        const setRating = () => rate(index + 1)
        const setHoverIndex = () => hover(index)
        const removeHoverIndex = () => hover(null)

        return {
            "onClick": callAll(setRating, onClick),
            "onMouseEnter": callAll(setHoverIndex, onMouseEnter),
            "onMouseLeave": callAll(removeHoverIndex, onMouseLeave),
            "aria-valuemax": maxRating,
            "aria-valuemin": 0,
            "aria-valuenow": state.rating,
            "title": `change rating to: ${index + 1}`,
            index,
            ...otherProps,
        }
    }

    return { getButtonProps, state }
}

const iconTypes = {
    default: "default",
    hover: "hover",
    filled: "filled",
    active: "active",
}

const getIconState = (key, state) => {
    if (state.rating === 0 && wasRated(state.lastEvent)) {
        return iconTypes.default
    }

    if (key < state.hoverIndex && !wasRated(state.lastEvent)) {
        return iconTypes.hover
    }

    if (key <= state.hoverIndex && wasRated(state.lastEvent)) {
        return iconTypes.filled
    }

    if (key === state.hoverIndex && !wasRated(state.lastEvent)) {
        return iconTypes.active
    }

    if (state.hoverIndex === null && key < state.rating) {
        return iconTypes.filled
    }

    return iconTypes.default
}

const Rating = ({
    iconDefault,
    iconFilled,
    iconHover,
    iconActive,
    maxRating = 5,
    state: controlledState,
    onChange,
    style,
    name,
} = {}) => {
    const { state, getButtonProps } = useRating({
        onChange,
        controlledState,
        maxRating,
    })

    const possibleIcons = {
        [iconTypes.default]: iconDefault,
        [iconTypes.hover]: iconHover,
        [iconTypes.active]: iconActive,
        [iconTypes.filled]: iconFilled,
    }

    const ratingElements = Array(maxRating)
        .fill(null)
        .map((_, key) => {
            const moreProps = getButtonProps({
                index: key,
                style: { listStyleType: "none" },
            })

            const iconState = getIconState(key, state)
            return (
                <li key={key} {...moreProps}>
                    {possibleIcons[iconState]}
                </li>
            )
        })

    return (
        <ul {...{ style: { margin: 0, padding: 0, ...style }, name }}>
            {ratingElements}
        </ul>
    )
}

export { Rating, actionTypes, wasRated }
