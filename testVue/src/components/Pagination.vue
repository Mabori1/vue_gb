<template>
  <div class="pagination">
    <ul class="pagination__box">
      <li class="pagination__item">
        <router-link
          @click="onClickPreviousPage"
          :to="getPageLinkPrev"
          :class="{ pagination__button_inactive: isInFirstPage }"
          class="pagination__button"
        >
          <svg
            class="pagination__button-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="53"
            height="52"
            viewBox="0 0 53 52"
            fill="none"
          >
            <circle cx="26.5" cy="26" r="25.5" stroke="#FFFFF" />
            <path
              d="M23.5571 32L29.5 25.3143L23.5571 18.6286"
              stroke="#292F36"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>
      </li>
      <li v-for="page in pages" class="pagination__item">
        <router-link
          @click="onClickPage(page)"
          :to="getPageLink"
          :class="{ pagination__button_active: isPageActive(page) }"
          class="pagination__button"
          :disabled="page"
        >
          0{{ page }}
        </router-link>
      </li>
      <li class="pagination__item">
        <router-link
          @click="onClickNextPage"
          :to="getPageLinkNext"
          :class="{ pagination__button_inactive: isInLastPage }"
          class="pagination__button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="53"
            height="52"
            viewBox="0 0 53 52"
            fill="none"
          >
            <circle cx="26.5" cy="26" r="25.5" stroke="#FFFFF" />
            <path
              d="M23.5571 32L29.5 25.3143L23.5571 18.6286"
              stroke="#292F36"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",

  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
      validator: function (value) {
        return value >= 0;
      },
    },
    totalNumberPaginationPages: {
      type: Number,
      required: true,
      validator: function (value) {
        return value >= 0;
      },
    },
    currentPage: {
      type: Number,
      required: true,
      validator: function (value) {
        return value >= 0;
      },
    },
    pageKey: {
      type: String,
      required: true,
      validator: function (value) {
        if (typeof value === "string") return value;
      },
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalNumberPaginationPages) {
        return this.totalNumberPaginationPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalNumberPaginationPages
      );
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push(i);
      }

      return range;
    },
    isInFirstPage() {
      if (this.currentPage === 1) {
        return true;
      }
    },
    isInLastPage() {
      if (this.currentPage === this.totalNumberPaginationPages) {
        return true;
      }
    },
    getPageLink() {
      return `/${this.pageKey}/${this.currentPage}`;
    },
    getPageLinkPrev() {
      if (this.currentPage > 1) {
        return `/${this.pageKey}/${this.currentPage - 1}`;
      } else {
        return `/${this.pageKey}/1`;
      }
    },
    getPageLinkNext() {
      if (this.currentPage < this.totalNumberPaginationPages) {
        return `/${this.pageKey}/${this.currentPage + 1}`;
      } else {
        return `/${this.pageKey}/${this.totalNumberPaginationPages}`;
      }
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalNumberPaginationPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
