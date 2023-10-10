<template>
    <a-card hoverable style="width: 100%; height: auto">
        <template #cover>
            <img style="object-fit: cover; height: 160px; padding: 10px" alt="example" :src="data?.thumbnail" />
        </template>
        <a-card-meta :title="data?.title">
            <template #description>
                <a-typography-link href="https://antdv.com" target="_blank" :content="data.category" />
                <div>{{ data?.price }}</div>
                <a-typography-paragraph type="secondary" :ellipsis="{ tooltip: data?.description }"
                    :content="data.description" />
            </template>
        </a-card-meta>
        <template #actions>
            <div>DC: {{ data?.discountPercentage + "%" }} </div>
            <div>Stock: {{ data?.stock}}</div>
        </template>
    </a-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        data: { type: Object, default: {} },
    },
    components: {
    },
    setup() {
        return {
        };
    },
});
</script>