import type { AnimationObject } from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
  loop?: boolean; // defaults to true; set false for one-shot animations
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('@/assets/lottie/bouncing_ball.json'),
    text: 'derealKello brings you the best',
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: require('@/assets/lottie/pulse_circle.json'),
    text: 'Perseverance is the key to becoming a "Kello"',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: require('@/assets/lottie/spinner_ring.json'),
    text: 'Nobody knows what the future holds',
    textColor: '#f15937',
    backgroundColor: '#faeb8a',
  },
  {
    id: 4,
    animation: require('@/assets/lottie/success_check.json'),
    text: 'Use the correct methods in learning a framework',
    textColor: '#6464e6',
    backgroundColor: '#fa43a2',
    loop: false,
  },
];

export default data;