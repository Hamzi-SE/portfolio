import { airbnb, blogapp, discord, nelami, nextchatter, skillsurge } from '../assets';
import { projects as projectsData } from './portfolio-data.js';

export { profile, navLinks, about, experiences, socials } from './portfolio-data.js';

const projectImages = [nelami, skillsurge, nextchatter, discord, airbnb, blogapp];

export const projects = projectsData.map((project, i) => ({
  ...project,
  image: projectImages[i],
}));
