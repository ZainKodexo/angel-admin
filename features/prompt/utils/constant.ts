import { TPrompt } from '../types';

export const PROMPTCATEGORY = [
  {
    title: 'Couple Therapy',
    value: 'couple',
  },
  {
    title: 'Single Person Therapy',
    value: 'single',
  },
];

export const PROMPTS: TPrompt[] = [
  {
    id: '1',
    name: 'Couple - Pre-Consultation - Summary',
    content: `Generate a comprehensive summary for a couple's pre-consultation session. Focus on relationship dynamics, communication patterns, and initial concerns raised by both partners.`,
    type: 'single',
  },
  {
    id: '2',
    name: 'Couple - Pre-Consultation - Summary',
    content: `Generate a comprehensive summary for a couple's pre-consultation session. Focus on relationship dynamics, communication patterns, and initial concerns raised by both partners.`,
    type: 'single',
  },
  {
    id: '3',
    name: 'Couple - Pre-Consultation - Summary',
    content: `Generate a comprehensive summary for a couple's pre-consultation session. Focus on relationship dynamics, communication patterns, and initial concerns raised by both partners.`,
    type: 'couple',
  },
  {
    id: '4',
    name: 'Single - Regular - Podcast',
    content: `Generate a comprehensive summary for a couple's pre-consultation session. Focus on relationship dynamics, communication patterns, and initial concerns raised by both partners.`,
    type: 'single',
  },
];
