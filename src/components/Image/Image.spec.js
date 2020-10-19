import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Image from './Image';

describe('Image', () => {
    it('should render correctly', () => {
        const tree = renderer
            .create(<Image src='http://asd.com' />)
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should accept width and height props', () => {
        const tree = renderer
            .create(<Image width={500} height={750} src='http://asd.com' />)
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should change visible image after loading', () => {
        const component = renderer.create(
            <Image src='http://asd.com' />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const img = component.root.findAllByType('img')[0];
        expect(img).toBeDefined();
        
        act(() => img.props.onLoad());

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should keep fallback image if image not loaded', () => {
        const component = renderer.create(
            <Image src='http://asd.com' />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const img = component.root.findAllByType('img')[0];
        expect(img).toBeDefined();
        
        act(() => img.props.onError());

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
