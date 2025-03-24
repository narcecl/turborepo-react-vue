import { fn } from '@storybook/test'
import { Button } from '@narcecl/vue';

export default {
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    argTypes: {
    },
    args: { onClick: fn() }
}

export const Primary = {
    args: {
        label: 'This is a Vue Button'
    }
}