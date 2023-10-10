<template>
    <a-form :model="formState" name="basic" autocomplete="off" ref="formRef" @finish="onFinish">
        <a-row :gutter="[16, 8]" justify="end">
            <a-col :span="24" :md="8">
                <a-form-item name="q" label="">
                    <a-input v-model:value="formState.q" placeholder="Input name to searching"></a-input>
                </a-form-item>
            </a-col>
            <a-col :span="24" :md="3"><a-button type="primary" html-type="submit">
                    Search
                </a-button></a-col>
        </a-row>
    </a-form>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import { computed, reactive } from 'vue';
import type { UnwrapRef } from 'vue';
export default defineComponent({
    props: {
        data: {
            type: Object,
            default: () => { q: null },
        },
    },
    setup(props, { emit }) {
        interface FormState {
            q: string;
        }
        const formState: UnwrapRef<FormState> = reactive({
            q: '',
        });
        const formRef = ref();

        const onFinish = () => {
            emit("finish", formState);
        };

        onBeforeMount(() => {
            formState.q = props.data?.q;
        })
        return {
            formState,
            formRef,
            onFinish
        }
    }

})
</script>
  
  