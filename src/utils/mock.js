import bubble_1 from '../assets/images/warn/bubble_1.png'
import bubble_2 from '../assets/images/warn/bubble_2.png'
import bubble_3 from '../assets/images/warn/bubble_3.png'
import bubble_4 from '../assets/images/warn/bubble_4.png'
import bubble_5 from '../assets/images/warn/bubble_5.png'
import bubble_6 from '../assets/images/warn/bubble_6.png'
export default {
    bubbleData: [{
        style: {
            width: '2.55rem',
            height: '2.6rem',
            lineHeight: '1.8rem',
            left: '4.2rem',
            top: '1rem',
            fontSize: '.8rem',
            zIndex: 1,
            // background: 'radial-gradient(at 20% 30%, #38b0d1, rgba(0, 0, 0, 0), #3448cc)'
            background: 'url(' + bubble_1 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%'
        }
    },
    {
        style: {
            width: '1.5rem',
            height: '1.5rem',
            lineHeight: '0.9rem',
            left: '7.5rem',
            top: '2rem',
            fontSize: '.6rem',
            // background: 'radial-gradient(at 20% 30%, #0676FF, rgba(0, 0, 0, 0), #3448CC)'
            background: 'url(' + bubble_2 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%'
        }
    },
    {
        style: {
            width: '1.3rem',
            height: '1.3rem',
            lineHeight: '0.8rem',
            left: '6.5rem',
            top: '0rem',
            fontSize: '.6rem',
            // background: 'radial-gradient(at 20% 30%, #ff5006, rgba(0, 0, 0, 0), #988339)'
            background: 'url(' + bubble_3 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%'
        },
        changeScale: 1,
        scale: {
            display: 'inline-block',
            transform: 'scale(.8) translateX(-5%)'
        }
    },
    {
        style: {
            width: '1.47rem',
            height: '1.47rem',
            lineHeight: '1rem',
            left: '2.9rem',
            top: '0rem',
            fontSize: '.6rem',
            // background: 'radial-gradient(at 20% 30%, #B838D1, rgba(0, 0, 0, 0), #3448CC)'
            background: 'url(' + bubble_4 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%'
        },
        changeScale: 2,
        scale: {
            display: 'inline-block',
            transform: 'scale(.7) translateX(-10%)'
        }
    },
    {
        style: {
            width: '2.21rem',
            height: '2.21rem',
            lineHeight: '1.6rem',
            left: '1.7rem',
            top: '1.5rem',
            fontSize: '.6rem',
            // background: 'radial-gradient(at 20% 30%, #06FF2A, rgba(0, 0, 0, 0), #04B59E)'
            background: 'url(' + bubble_5 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%'
        },
        changeScale: 3,
        scale: {
            display: 'inline-block',
            transform: 'scale(.9) translateX(38%)'
        }
    },
    {
        style: {
            width: '1.47rem',
            height: '1.47rem',
            lineHeight: '1rem',
            left: '8rem',
            top: '0.5rem',
            fontSize: '.6rem',
            // background: 'radial-gradient(at 20% 30%, #06FF2A, rgba(0, 0, 0, 0), #04B59E)'
            background: 'url(' + bubble_6 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%'
        },
        changeScale: 3,
        scale: {
            display: 'inline-block',
            transform: 'scale(.5) translateX(-30%)'
        }
    }
    ]
}
