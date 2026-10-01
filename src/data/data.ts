import { AnimationObject } from 'lottie-react-native';

export interface OnboardingData { 
    id: number;
    animation: AnimationObject;
    text: string;
    textColor: string;
    backgroundColor: string;
};

const data: OnboardingData[] = [
    {
        id: 1,
        animation: null,
        text: 'derealKello brings you the best',
        textColor: '#005b4f',
        backgroundColor: '#ffa3ce'
    },
    {
        id: 2,
        animation: null,
        text: 'Perseverance is the key to becoming a "Kello"',
        textColor: '#1e2169',
        backgroundColor: '#bae4fd'
    },
    {
        id: 3,
        animation: require( '@/assets/images/tabIcons/aldj.json' ),
        text: 'Nobody knows what the future holds',
        textColor: '#f15937',
        backgroundColor: '#faeb8a'
    }
];

export default data;
