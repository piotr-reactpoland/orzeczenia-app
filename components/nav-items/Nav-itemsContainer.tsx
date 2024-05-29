import React from 'react';
import Nav-itemsView from './Nav-itemsView';

interface INav-itemsContainerProps {
}

export interface INav-itemsViewProps {
}

const Nav-itemsContainer=(props: INav-itemsContainerProps) => {
   const { } = props

   const passProps: INav-itemsViewProps = {

   }

   return <Nav-itemsView {...passProps}/>
} 

Nav-itemsContainer.defaultProps = {

} 

export default Nav-itemsContainer;
