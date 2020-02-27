// husky 中可以配置的 hook：
// applypatch-msg            post-rewrite              pre-push.sample
// applypatch-msg.sample     post-update               pre-rebase
// commit-msg                post-update.sample        pre-rebase.sample
// commit-msg.sample         pre-applypatch            pre-receive.sample
// husky.local.sh            pre-applypatch.sample     prepare-commit-msg
// husky.sh                  pre-auto-gc               prepare-commit-msg.sample
// post-applypatch           pre-commit                push-to-checkout
// post-checkout             pre-commit.sample         sendemail-validate
// post-commit               pre-merge-commit          update.sample
// post-merge                pre-push

// type(scope?): subject  #scope is optional
module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};

// https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
