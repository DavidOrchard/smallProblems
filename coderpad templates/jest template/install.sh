# react 18
# https://coderpad.io/blog/development/how-to-upgrade-to-react-18/
npm install react@18
npm install react-dom@18
npm i @types/react@18 --save-dev

# jest
# https://coderpad.io/resources/docs/unit-testing/using-jest-with-react/
# https://embed.coderpad.io/sandbox?question_id=226041

# Babel Dependencies
npm install -D @babel/preset-env @babel/preset-react @babel/preset-typescript

# Testing-library Dependencies
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Jest Dependencies
npm install -D jest@28 jest-environment-jsdom@28

#babel.config.js
echo "module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}],
        '@babel/preset-typescript',

  ],
};
" > babel.config.js

echo '// jest.config.js
module.exports = {
  rootDir: ".",
  clearMocks: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js"
  ],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  }
};
' > jest.config.js

echo '// jest.setup.js
import "@testing-library/jest-dom";
' > jest.setup.js

cd src
mkdir Widget
cd Widget
echo "import React from 'react'

export const Widget: React.FC = () => {
  return <div>my widget</div>
}
" > Widget.tsx

echo "import React from 'react'
import { render } from '@testing-library/react'

import { Widget } from './Widget'

describe('Widget component', () => {
  it('should render', () => {
    const { asFragment, getByText } = render(<Widget />)

    expect(asFragment()).toMatchSnapshot()
    expect(getByText('my widget')).toBeTruthy()
  })
})
" > Widget.spec.tsx


# package.json
# {
#   "name": "react-template",
#   "private": true,
#   "version": "0.0.0",
#   "scripts": {
#     "test": "jest",
#     "test:watch": "jest --watchAll"
#   },
#   "dependencies": {
#     "react": "^18.2.0",
#     "react-dom": "^18.2.0"
#   },
#   "devDependencies": {
#     "@babel/preset-env": "^7.18.6",
#     "@babel/preset-react": "^7.18.6",
#     "@babel/preset-typescript": "^7.18.6",
#     "@testing-library/jest-dom": "^5.16.4",
#     "@testing-library/react": "^13.3.0",
#     "@testing-library/user-event": "^14.2.1",
#     "@types/node": "^16.11.33",
#     "@types/react": "^17.0.44",
#     "@types/react-dom": "^17.0.16",
#     "@vitejs/plugin-react": "^1.0.7",
#     "jest": "^28.1.1",
#     "jest-environment-jsdom": "^28.1.1",
#     "typescript": "^4.7.3",
#     "vite": "^2.9.1"
#   }
# }

