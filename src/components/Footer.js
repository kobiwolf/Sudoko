import React from 'react';
import styled from 'styled-components';
import A from './A';

const StyleFooter = styled.footer`
  height: max-content;
  background-color: lightgrey;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
`;
export default function Footer() {
  return (
    <StyleFooter>
      <h2>copyRights by Kobi Wolf &#169;</h2>
      <div>
        <A
          text={<i className="facebook f icon large"> </i>}
          location="https://www.facebook.com/kobi.wolf.58"
        />
        <A
          text={<i className="linkedin icon large"></i>}
          location="https://www.linkedin.com/in/kobi-wolf-01387a1a9/"
        />
        <A
          text={<i className="github icon large"></i>}
          location="https://github.com/kobiwolf"
        />
      </div>
    </StyleFooter>
  );
}
