//-- See full documentation for TypeIt at https://typeitjs.com.

new TypeIt('#element', {speed: 100})

  .type('<em>Hello.</em> I am <em>Kate Han.</em>')
  .pause(500)
  .break()
  .options({speed: 60})
  .type('<size>Thank you for coming to my site.</size>')
  .pause(1000)
  .break()
  .type('<size>I am waiting for your interests of me!</size>')
  .pause(1000)
  .break()
  .type('<size>Thank you!</size>');
