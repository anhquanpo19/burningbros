import { createVNode } from 'vue';
import * as $Icon from '@ant-design/icons-vue';
export const Icon = (props: { icon: string }) => {
	const { icon } = props;
	const $IconArray: any = $Icon;
	return createVNode($IconArray[icon]);
};
