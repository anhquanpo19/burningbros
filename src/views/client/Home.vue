<template>
  <a-card>
    <SearchProduct @finish="onSearch" />
    <a-row id="style-1" class="scrollbar" :gutter="[16, 16]">
      <a-col id="notifications" v-for="(product, index) in products" :key="index" :span="24" :md="6">
        <ProductCard :data="product" />
      </a-col>
      <div style="margin: auto"><a-spin :spinning="isSpinning" /></div>
      <InfiniteLoading style="text-align: center" target="#products" @infinite="loadMoreData" />
    </a-row>
  </a-card>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import { message } from "ant-design-vue";
import { uniqBy } from "lodash";
import ProductCard from "@/components/Product/ProductCard.vue"
import SearchProduct from "@/components/Product/SearchProduct.vue"
import { isEmpty } from "lodash";
import Services from "@/repositories/index";
const product = Services.get("product");
type typeSearch = {
  q: String
}
export default defineComponent({
  components: {
    InfiniteLoading,
    ProductCard,
    SearchProduct
  },
  setup() {
    const products: any = ref([]);
    const isSpinning = ref(false);
    const isLoadMore = ref(true);

    const paginationParams = {
      limit: 20,
      total: 20,
      skip: 0,
    }

    const loadProductPagination = async (params: Object) => {
      try {
        const data = isEmpty(params) ? await product.getList({ limit: paginationParams.limit, skip: paginationParams.skip, ...params }) : await product.getListSearch({ limit: paginationParams.limit, skip: paginationParams.skip, ...params });
        paginationParams.total = data.data.total;
        paginationParams.skip += 20;

        return data.data.products ?? [];
      } catch (error) {
        return []
      }
    }



    const loadMoreData = async () => {
      if (isLoadMore.value) {
        if (paginationParams.skip <= paginationParams.total) {
          isSpinning.value = true;
          const result = await loadProductPagination({});
          products.value = uniqBy(products.value.concat(result), "id");
          isSpinning.value = false;
        } else {
          isLoadMore.value = false;
          await message.warning("All products are available.");
        }
      }

    }

    const onSearch = async (data: typeSearch) => {
      isSpinning.value = true;
      paginationParams.skip = 0;
      const result = await loadProductPagination(data);
      products.value = result;
      isSpinning.value = false;
    }

    return {
      products,
      loadMoreData,
      isSpinning,
      onSearch,
    };
  },
});
</script>
<style scoped lang="scss">
.ant-card {
  box-shadow: none;
  height: 80%;
  position: relative;
}

:deep(.ant-form-item-label) {
  text-align: left;
}

:deep(.ant-form-item-control-input-content),
.ant-input {
  text-align: right;
}

.ant-form-item {
  margin-bottom: 12px;
}

.ant-form-item:last-child {
  margin-bottom: 0;
}

.scrollbar {
  margin-left: 30px;
  height: 72vh;
  left: 24px;
  top: 24px;
  right: 24px;
  bottom: 24px;
  background: #fff;
  overflow-y: scroll;
  margin-bottom: 25px;
}

.force-overflow {
  min-height: 450px;
}

#style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
