from django.views.generic import TemplateView

class IndexView(TemplateView):
    template_name = "cropapp/index.html"

class AboutView(TemplateView):
    template_name = "cropapp/about.html"