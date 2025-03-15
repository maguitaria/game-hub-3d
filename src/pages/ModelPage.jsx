// ModelPage.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ModelScene from '../components/ModelScene';

const ModelPage = () => {
   <>
   <ModelScene />
   <img className="controlKeys" src="/controls.png" alt="control keys" />
   </>
};


export default ModelPage;
