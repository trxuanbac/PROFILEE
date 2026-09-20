<script setup>
import Button from "../../../components/Button.vue";
import Banner from "../../../components/Banner.vue";
import Link from "../../../components/Link.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";

const cvPagePath = `${import.meta.env.BASE_URL}files/CV-Tran-Xuan-Bac.html?v=20260920-vi-layout2`;
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-content-copys">
          <h1 class="hero-title">Trần Xuân Bắc</h1>
          <Banner class="hero-banner" :copy="t('job-title')" v-if="!preloaderVisible" animated />
          <div class="hero-actions">
            <Link
              :href="cvPagePath"
              external
              class="hero-action"
              data-cursor="arrow-external"
              data-hoversound="hover"
            >
              <Button renderAs="div" variant="accent" size="sm">{{ t("download-cv") }}</Button>
            </Link>
            <Link
              href="https://github.com/xuanbackhoaibu"
              external
              class="hero-action"
              data-cursor="arrow-external"
              data-hoversound="hover"
            >
              <Button renderAs="div" variant="border" size="sm">GitHub</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-height: calc(var(--lvh) * 100);
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  &-content {
    align-items: center;
    justify-content: center;
    height: 54%;

    @include mixins.landscape {
      height: 100%;

      @include mixins.mq("md") {
        padding-bottom: 30%;
      }

      @include mixins.mq("lg") {
        padding-bottom: 5%;
      }
    }

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      gap: var(--space-xxl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: min(100%, calc(var(--svw) * 100 - var(--space-outer) * 2));
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      @include mixins.landscape {
        left: 0;
        transform: translateX(0);
        grid-column: 2 / 13;
        width: fit-content;
      }
    }

    &-copys {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      position: relative;
      max-width: 100%;

      @include mixins.mq("md") {
        gap: var(--space-md);
      }
    }

    &-button {
      width: fit-content;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: clamp(34px, 10vw, 76px);
    line-height: 1;
    white-space: nowrap;
    max-width: 100%;
  }

  &-banner {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 10;
    transform: rotate(-5deg) translate(0, 78%) scale(0.88);

    @include mixins.mq("sm") {
      right: -24px;
      transform: rotate(-5deg) translate(0, 70%) scale(1);
    }

    @include mixins.mq("lg") {
      right: -32px;
      transform: rotate(-5deg) translate(0, 80%);
    }
  }

  &-summary {
    max-width: 560px;
    color: var(--color-text-300);
    font-size: var(--font-size-md);
    font-weight: 700;
    line-height: var(--line-height-copy);

    @include mixins.mq("md") {
      font-size: var(--font-size-lg);
    }
  }

  &-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    position: relative;
    z-index: 11;
    padding-top: var(--space-xs);
  }

  &-action {
    width: fit-content;
  }
}
</style>
