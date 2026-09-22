<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";

const contactElement = ref<HTMLElement | null>(null);
const cvPagePath = `${import.meta.env.BASE_URL}files/CV-Tran-Xuan-Bac.html?v=20260922-skills`;

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-content">
      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
      <div class="contact-links-panel">
        <div class="contact-details" aria-label="Contact links">
          <a href="mailto:Bxuan964@gmail.com">Bxuan964@gmail.com</a>
          <a :href="cvPagePath" target="_blank" rel="noopener noreferrer">{{
            t("download-cv")
          }}</a>
        </div>
        <Social variant="background" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  padding: var(--space-outer);
  padding-top: var(--space-lg);

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 10;
      padding-top: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 11;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: clamp(32px, 11vw, 56px);
    color: var(--color-text-400);
    line-height: var(--line-height-title);
    max-width: 760px;
    text-shadow:
      0 1px 0 rgba(255, 255, 255, 0.88),
      0 10px 28px rgba(45, 42, 36, 0.16);

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
    }
  }

  &-links-panel {
    width: fit-content;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);

    :deep(.social) {
      gap: var(--space-sm);
    }

    :deep(.button-wrapper-background) {
      background-color: rgba(255, 255, 255, 0.78);
      color: var(--color-text-400);
      --icon-color: var(--color-text-400);
      border: var(--stroke-sm) solid rgba(45, 42, 36, 0.14);
      box-shadow: 0 8px 18px rgba(45, 42, 36, 0.1);
    }

    :deep(.button-wrapper-background:hover) {
      background-color: var(--color-orange-400);
      color: var(--color-white-400);
      --icon-color: var(--color-white-400);
      border-color: var(--color-orange-400);
    }
  }

  &-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
    font-family: "ProFontWindows";
    font-weight: 900;

    a {
      width: fit-content;
      max-width: 100%;
      padding: 10px 14px;
      border: var(--stroke-sm) solid rgba(45, 42, 36, 0.16);
      border-radius: var(--radius-sm);
      background-color: rgba(255, 255, 255, 0.78);
      color: var(--color-text-400);
      white-space: nowrap;
      box-shadow: 0 8px 18px rgba(45, 42, 36, 0.1);
      text-shadow: none;
      overflow: hidden;
      text-overflow: ellipsis;
      transition:
        background-color 0.15s ease,
        box-shadow 0.15s ease,
        color 0.15s ease,
        border-color 0.15s ease;

      @include mixins.hover {
        &:hover {
          background-color: var(--color-orange-400);
          box-shadow: 0 10px 24px rgba(255, 132, 0, 0.24);
          color: var(--color-white-400);
          border-color: var(--color-orange-400);
        }
      }
    }
  }
}
</style>
